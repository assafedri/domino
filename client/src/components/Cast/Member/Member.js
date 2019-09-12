import React from 'react';
import classes from './Member.module.scss';
import Skits from '../../Skits/Skits';
import Button from '../../UI/Button/Button';
 
const Member = (props) => {
    return(
        <section className={classes.Member}>

            <div className={classes.Title}>
                <h1>{props.member.name}</h1>
                <p>{props.member.team}</p>
            </div>

            <div className={classes.Admin}>
                <Button type="Warning" size="xs" href="/">ערוך</Button> 
                <form>
                    <Button type="Danger" size="xs">מחק</Button>
                </form>
            </div>

            <div className={classes.Image}>
                <img src={props.member.image} alt={props.member.name} />
            </div>

            <div className={classes.Description}>
                <p>{props.member.description}</p>
            </div>
            <Skits
                id={props.member._id}
                skits={props.member.skits} 
                title={`מערכונים בהשתתפות ${props.member.name}:`} />
        </section>
    )
}

export default Member;