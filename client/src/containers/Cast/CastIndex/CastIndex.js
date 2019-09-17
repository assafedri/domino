import React from "react";
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import Cast from '../../../components/Cast/Cast'
import classes from './CastIndex.module.scss'

class CastIndex extends React.Component{

    castClickHandler = (e) => {
        const targetId = e.target.parentNode.id
        this.props.history.push('/cast/' + targetId)
    }

    render(){
        return(
            <div className={classes.CastIndex} >
                <section>
                    <h1>שחקנים</h1>
                    <p>כאן תוכלו למצוא את כל מי שהשתתף בדומינו</p>
                </section>

                {this.props.error.message}
                
                {this.props.cast ? this.props.cast.map( group => (
                    <div key={group.id}>
                        <h2>{group.label}</h2>
                        <Cast 
                            cast={group.data}
                            clicked={this.castClickHandler}
                        />
                    </div>
                ) ) : null}
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