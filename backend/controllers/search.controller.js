import { User } from "../models/user.model.js";
import { fectchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  //https://api.themoviedb.org/3/search/person?query=vijay&include_adult=false&language=en-US&page=1
  const { query } = req.params;
  try {
    const response = await fectchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchhistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ Success: true, content: response.results });
  } catch (error) {
    console.log("Error in search person" + error.message);
    res.status(500).json({ success: false, message: "Internal server error " });
  }
}
export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fectchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchhistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ Success: true, content: response.results });
  } catch (error) {
    console.log("Error in search movie" + error.message);
    res.status(500).json({ success: false, message: "Internal server error " });
  }
}
export async function searchTvshow(req, res) {
  const { query } = req.params;
  try {
    const response = await fectchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchhistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "Tv show",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ Success: true, content: response.results });
  } catch (error) {
    console.log("Error in search movie" + error.message);
    res.status(500).json({ success: false, message: "Internal server error " });
  }
}
export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchhistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
export async function deleteSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id); // because the id is in the typeof int but req.params will return in string
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchhistory: { id: id },
      },
    });
    res.status(200).json({ Success: false, message: "Item removed" });
  } catch (error) {
    console.log("error in deleting the History" + error.message);
    res
      .status(500)
      .json({ Success: false, message: "Internal error in deleting history" });
  }
}