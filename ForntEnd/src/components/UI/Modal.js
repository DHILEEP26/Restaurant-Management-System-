import React,{Fragment} from "react";
import  ReactDOM  from "react-dom";
import classes from"./Modal.module.css";

const BackDrop=(props)=>{
  return(
    <div className={classes.backdrop} onClick={props.onClose}></div>
  );
};

const ModalOveraly=(props)=>{
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement=document.getElementById("overlays")
const Modal=(props)=>{
    return(
        <Fragment>
         {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>,portalElement)}
         {ReactDOM.createPortal(<ModalOveraly>{props.children}</ModalOveraly>,portalElement)}
        </Fragment>
    )
}

export default Modal;