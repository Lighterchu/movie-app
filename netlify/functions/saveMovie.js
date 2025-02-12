const { Client, Databases } = require("appwrite");

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66bdc5c2001ad462e3df");

const databases = new Databases(client);

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { userId, movieId, title, poster } = body;

  try {
    const response = await databases.createDocument(
      "movies_db",
      "saved_movies",
      movieId,
      { userId, movieId, title, poster, createdAt: new Date().toISOString() }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
