

import "./App.css";
import { useEffect, useState } from "react";

function App() {
 
  const [name,setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [search,setSearch]=useState("titanic")
  const [fav,setFav]=useState([]);
  // const [count,setCount]=useState(0);
  
  
  
  useEffect(() => {
    fetch
     (`http://www.omdbapi.com/?i=tt3896198&apikey=582de5f4&s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.Search){
          setMovies(data.Search);
        console.log(data.Search);
        }        
      });
  }, [search]);

  useEffect(() => {
    
  }, [fav]);

  const clickHandler=(e)=>{
    e.preventDefault();
    setSearch(name);
   
  }


  const onClickFavourite=(e)=>{
    e.preventDefault();
    // const newFav=[...fav,movie];
    //  setFav(newFav);
   let add;
    movies.map((movie,imdbID)=>{
      if(imdbID==e.target.id){
        // fav.push(movies)
        add=movie;
      }
    })
    setFav([...fav,add])
    let newData=[]
    movies.map((movie,imdbID)=>{
      if(imdbID!==e.target.id){
        newData.push(movie)
      }
    })
    setMovies(newData)
    // setCount(count+1);
  }

  const removeHandler=(e)=>{
    // e.preventDefault();
   let newFav=[];
    fav.map((movie)=>{
      if(movie.imdbID !== e.target.id){
        newFav.push(movie);
      }
    })
    setFav(newFav)
    // setCount(count-1) 
    
   
  }
  return (
    <>
       
       <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <form class="d-flex">
            <input class="form-control me-2"  
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search"/>
            <button class="btn btn-outline-success" type="submit"
              onClick={clickHandler} >Search</button>
          </form>
        </div>
      </nav>
       
      
      
      <div className="row">           
       {movies.map((movie,imdbID) => {
        return (
          <>
          <div className="col-md-4">
            <div className="movies" >
                    <img 
                        class="card-img-top"
                        src={movie.Poster}
                        alt="movie" />
               <div class="card-body">
              
                    <h5 key={movie.Title}>{movie.Title}</h5>
                    <p key={movie.Year}  style={{fontWeight:600}}>{movie.Year} </p>
                    <a href="#" class="btn btn-primary" id={imdbID} onClick={onClickFavourite}>  Add to Favourite </a>
              
                 </div>
            </div>
            </div>
           
          
          </>
        );
      })}
      </div>


   
      <div className="row">  
      <h2 className="fav">Favorite Movies     <span></span></h2>
  
            {
              fav.length>0 
              ?
              fav.map((movie,imdbID) => {
        return (
          <>
          <div className="col-md-4">
            <div className="movies" >
                    <img 
                        class="card-img-top"
                        src={movie.Poster}
                        alt="movie" />
               <div class="card-body">
              
                    <h5 key={movie.Title}>{movie.Title}</h5>
                    <p key={movie.Year}  style={{fontWeight:600}}>{movie.Year} </p>
                    <a href="#" class="btn btn-primary" id={imdbID} onClick={removeHandler}> Remove from Favorite </a>
              
                 </div>
            </div>
            </div>          
          </>
        );
      })
      :
      <p>empty</p>
      }    
            </div>
    </>
  );
    }

export default App;