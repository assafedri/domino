import React from "react";
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import Cast from '../../../components/Cast/Cast'
import classes from './CastIndex.module.scss'

class CastIndex extends React.Component{

    castClickHandler = (e) => {
        const targetId = e.target.parentNode.id
        const selectedIndex = this.props.cast.findIndex( el => el._id === targetId)
        this.props.history.push('/cast/' + this.props.cast[selectedIndex]._id)
    }

    render(){
        let castGroupsArray = [];

        if(this.props.cast){
            const castGroupsObject = this.props.cast.reduce( (teams,current) => {
                const team = current.team;
                teams[team] = (teams[team] || []).concat(current);
                return teams;
            },[]);
           
            // eslint-disable-next-line 
            for(let key in castGroupsObject){
                castGroupsArray.push({id: key, data: castGroupsObject[key]})
            }
        }   
    
        return(
            <div className={classes.CastIndex} >
                <section>
                    <h1>שחקנים</h1>
                    <p>כאן תוכלו למצוא את כל מי שהשתתף בדומינו</p>
                </section>
                {this.props.error.message}
                {castGroupsArray.map( group => (
                    <div key={group.id}>
                        <h2>{this.props.team_labels[group.id]}</h2>
                        <Cast 
                            cast={group.data}
                            clicked={this.castClickHandler}
                        />
                    </div>
                ) )}
            </div>    
        )
    }
}

const mapStateToProps = state => {
    return {
        team_labels: state.team_labels,
        cast: state.cast,
        error: state.error
    }
}

export default connect(mapStateToProps)(withRouter(CastIndex));