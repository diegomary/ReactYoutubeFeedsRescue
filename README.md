The application has been ejected and css module are now enable as per the following tutorial

https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2


Some useful code and notes to tidy up later

 let pages = [...Array(this.numberOfPages).keys()];
 let pp = pages.map((item)=>{
   return(
     <span key={item}>{item+1}</span>
   )
 })


IIFE pronounced "iffy" (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined

We have installed bootstrap and font-awesome globally by using their CDNs (content developer network) in the index.html file

The following are examples of both font-awesome and bootstrap
<i className ="fa fa-camera-retro fa-lg"></i> 
<i className ="glyphicon glyphicon-home"></i>

The following is the original method to pass properties in the query string to redirect to the wanted component

<Link to = {`/details/${encodeURIComponent(item.id.replace(/'?'/g, '%3F'))}/secondoptional`}>