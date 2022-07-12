export const ImgCard = ({imagen})=> {



    
    return (
        <div className="my-2">
           <button 
                className="m-1 px-2 bg-red-600 text-center items-center rounded-sm absolute hover:cursor-pointer"

                onClick={ (e)=> {
                    console.log(e.target.parentNode);
                }}
            >
            x
           </button>
            <img src={imagen.url} width="200px" height="200px"/>
        </div>
    );

}