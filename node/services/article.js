const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const DATA_STORE = path.join(__dirname, "data", "articles.json");

const postArticle = async (article) => {
  const data = readFromDataStore();
  if (!data) {
    return {
      response: {
        error: [{ msg: "There was an error connecting to the data store" }],
        success: false,
      },
      status: 500,
    };
  }
  article.id = uuid.v4();
  data.articles.push(article);

  if (writeToDataStore(data)) {
    return {
      response: {
        data: {
          msg: `Article posted with ID ${article.id}`,
          id: article.id,
        },
        success: true,
      },
      status: 200,
    };
  } else {
    return {
      response: {
        error: [{ msg: "There was an error connecting to the data store" }],
        success: false,
      },
      status: 500,
    };
  }
};

const getAllArticles = async () => {
  const data = readFromDataStore();
  if (!data) {
    return {
      response: {
        error: [{ msg: "There was an error connecting to the data store" }],
        success: false,
      },
      status: 500,
    };
  }
  result = data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    published: article.published,
    id: article.id,
  }));
  return {
    response: {
      data: result,
      success: true,
    },
    status: 200,
  };
};

const getArticleById = async (id) => {
  const data = readFromDataStore();
  if (!data) {
    return {
      response: {
        error: [{ msg: "There was an error connecting to the data store" }],
        success: false,
      },
      status: 500,
    };
  }
  const result = await data.articles.find((article) => article.id == id);

  if (!result) {
    return {
      response: {
        error: [{ msg: "The article you are looking for does not exist" }],
        success: false,
      },
      status: 404,
    };
  }
  return {
    response: {
      data: result,
      success: true,
    },
    status: 200,
  };
};

const updateArticle = async (id, updatedArticle) => {
  const data = readFromDataStore();
  if (!data) {
    return {
      response: {
        error: [{ msg: "There was an error connecting to the data store" }],
        success: false,
      },
      status: 500,
    };
  }

  const article = await data.articles.find((article) => article.id == id);

  if (!article) {
    return {
      response: {
        error: [{ msg: "The article you are looking for does not exist" }],
        success: false,
      },
      status: 404,
    };
  }

  const updatedData = await data.articles.map((article) =>
    article.id == id ? { ...article, ...updatedArticle } : article
  );

  if (writeToDataStore({ articles: updatedData })) {
    return {
      response: {
        data: {
          msg: "Article updated",
        },
        success: true,
      },
      status: 200,
    };
  } else {
    return {
      response: {
        error: [{ msg: "There was an error connecting to the data store" }],
        success: false,
      },
      status: 500,
    };
  }
};

const removeArticle = async (id) => {
  try {
    const data = readFromDataStore();
    if (!data) {
      return false;
    }
    const remaining = data.articles.filter((article) => article.id != id);
    writeToDataStore({ articles: remaining });
    return true;
  } catch (e) {
    return false;
  }
};

const removeAllArticles = async () => {
  try {
    writeToDataStore({ articles: [] });
    return true;
  } catch (e) {
    return false;
  }
};

const readFromDataStore = () => {
  try {
    data = fs.readFileSync(DATA_STORE, "utf8");
  } catch (error) {
    return { articles: [] };
  }
  if (!data) return { articles: [] };
  return JSON.parse(data);
};

const writeToDataStore = (data) => {
  try {
    data = JSON.stringify(data);
    fs.writeFile(DATA_STORE, data, "utf8", () => {});
  } catch {
    return false;
  }
  return true;
};

module.exports = {
  postArticle,
  getAllArticles,
  getArticleById,
  removeArticle,
  updateArticle,
  removeAllArticles,
};
