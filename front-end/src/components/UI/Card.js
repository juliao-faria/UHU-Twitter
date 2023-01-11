import React from "react";
import classes from "./Card.module.css"

const Card = (props) => {
  return (
    <div className="col-lg-12">
      <div className={classes.card}>{props.children}</div>
    </div>

  )
}
export default Card;