const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  postArticle,
  getAllArticles,
  getArticleById,
  removeArticle,
  updateArticle,
  removeAllArticles,
} = require("../../../services/article");

//ADD POST
router.post(
  "/",
  [
    check("title", "title is required").trim().notEmpty(),
    check("description", "description is required").trim().notEmpty(),
    check("published", "invalid feild 'published'").isBoolean(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        error: validationErrors.array(),
        success: false,
      });
    }
    const newArticle = req.body;

    const result = await postArticle(newArticle);
    return res.status(result.status).json(result.response);
  }
);

//UPDATE POST
router.put("/:id", async (req, res) => {
  const result = await getArticleById(req.params.id);
  if (!result.response.success) {
    return res.status(result.status).json({
      error: [{ msg: result.response.error[0].msg }],
      success: false,
    });
  }
  const article = result.response.data;
  if (!article) {
    return {
      response: {
        error: [{ msg: "The article you are looking for does not exist" }],
        success: false,
      },
      status: 404,
    };
  }
  const success = await updateArticle(req.params.id, req.body);

  return success
    ? res.status(200).json({
        data: {
          msg: "Article updated successfully",
        },
        success: true,
      })
    : res.status(400).json({
        error: [{ msg: "Failed to updated the article" }],
        success: false,
      });
});

//GET ALL ARTICLES
router.get("/", async (req, res) => {
  const result = await getAllArticles();
  return res.status(result.status).json(result.response);
});

//DeleteAll Post
router.get("/deleteAll", async (req, res) => {
  const result = await getAllArticles();
  if (result.response.data.length == 0) {
    return {
      response: {
        error: [{ msg: "There are no articles to delete" }],
        success: false,
      },
      status: 404,
    };
  }
  const success = removeAllArticles();
  return success
    ? res.status(200).json({
        data: {
          msg: "Articles deleted successfully",
        },
        success: true,
      })
    : res.status(400).json({
        error: [{ msg: "Failed to delete the articles" }],
        success: false,
      });
});

//GET ARTICLE BY ID
router.get("/:id", async (req, res) => {
  const result = await getArticleById(req.params.id);
  return res.status(result.status).json(result.response);
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  const result = await getArticleById(req.params.id);
  if (!result.response.success) {
    return res.status(result.status).json({
      error: [{ msg: result.response.error[0].msg }],
      success: false,
    });
  }
  const article = result.response.data;
  if (!article) {
    return {
      response: {
        error: [{ msg: "The article you are looking for does not exist" }],
        success: false,
      },
      status: 404,
    };
  }
  const success = await removeArticle(req.params.id);

  return success
    ? res.status(200).json({
        data: {
          msg: "Article deleted successfully",
        },
        success: true,
      })
    : res.status(400).json({
        error: [{ msg: "Failed to delete the article" }],
        success: false,
      });
});

module.exports = router;
