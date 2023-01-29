import React from "react";
import {  Modal} from "@mui/material";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import "./ThemePreview.scss"
import {guid} from "../../Utility/utils.js"
const ThemePreview = ({open,text,themesClose}) => {


    function createText(t){
        return <div key={guid()} className="text-cont">
            <span className="text" dangerouslySetInnerHTML={{ __html: t.replaceAll("\n","<br>") }} ></span></div>
    }

    return(
        <Modal open={open} onClose={themesClose}>
            <div className="themes-cont" >
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry children="" className="text-list" variant="masonry" gutter={"10px"}  >
                        {text?text.map((e) => createText(e)):null}

                    </Masonry >
                </ResponsiveMasonry>

            </div>

        </Modal>
    )

}

export default  ThemePreview