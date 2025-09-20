import { Client, Databases, ID, Query, Permission, Role, Account } from "appwrite";

// Load env variables
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Initialize client
const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);
const account = new Account(client);

export const initSession = async () => {
  try {
    await account.createAnonymousSession();
    console.log("Anonymous session started");
  } catch (err) {
    // If session exists, ignore error
    if (err.message.includes("User already logged in")) {
      console.log("Anonymous session already exists");
    } else {
      console.error("Session error:", err);
    }
  }
};

// ✅ Update or create search count
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    console.log("updateSearchCount called with:", searchTerm, movie);

    // Wrap query in array
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", searchTerm)]
    );

    console.log("Query result:", result.documents);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      const newCount = doc.count + 1;

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        { count: newCount }
      );

      console.log("Updated document count to", newCount);
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.any()),
        ]
      );

      console.log("Created new document for search term:", searchTerm);
    }
  } catch (error) {
    console.error("Appwrite error:", error);
  }
};

export const getTrendingMovies = async() =>
{
  try{
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5),
      Query.orderDesc("count")]
    );

    return result.documents;
  } catch(error){
    console.error(error);
  }
}



