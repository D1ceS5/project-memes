import React from "react";
import { ImageListItem, Modal} from "@mui/material";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import "./MemesPreview.scss"
const MemesPreview = ({open,images,memesClose}) => {

    function createImg(src){
       return <ImageListItem>
           <img
               src={src}
               srcSet={src}
               alt="Meme"
               loading="lazy"
           />
       </ImageListItem>
    }

    return(
        <Modal open={open} onClose={memesClose}>
            <div className="memes-cont" >
                <ResponsiveMasonry className="memes-masonry" columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry children="" variant="masonry" gutter={"10px"}  >
                        {images?images.map((e) => createImg(e)):null}

                    </Masonry>
                </ResponsiveMasonry>

            </div>

        </Modal>
    )

}

export default  MemesPreview