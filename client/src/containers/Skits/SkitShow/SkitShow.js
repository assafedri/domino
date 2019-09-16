import React from 'react';
import axios from '../../../axios-domino';
import {withRouter, Link} from 'react-router-dom';

import YoutubeVideo from '../../../components/Skits/Skit/YoutubeVideo/YoutubeVideo';
import Aired from '../../../components/Skits/Skit/Aired/Aired';
import Comments from '../../../components/Skits/Skit/Comments/Comments';
import Cast from '../../../components/Cast/Cast';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

import classes from './SkitShow.module.scss'; 
import PageNotFound from '../../PageNotFound/PageNotFound';

class SkitShow extends React.Component{
    state = {
        skit: {},
        loading: true,
        error: false
    }

    componentDidMount(){
        this.getSkitData(this.props.match.params.id);
    }

    getSkitData = (id) => {
        axios.get(`/api/skits/${id}`)
        .then( response => {
            if(response.status === 200){
                this.setState({skit: response.data, loading: false})
            }
        }).catch(error => {
            this.setState({error: error.message})
        })
    }

    castClickHandler = (e) => {
        const targetId = e.target.parentNode.id
        this.props.history.push('/cast/' + targetId);
    }

    deleteSkitHandler = (e) => {
        e.preventDefault();
        const skitId = this.state.skit._id;
        
        if(window.confirm('האם אתה בטוח?')){
            axios.delete(`/api/skits/${skitId}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        }
    }

    render(){
        let pageContent = <Spinner message="טוען מערכון..."/>;

        if(this.state.error){
            pageContent = <PageNotFound message="המערכון לא נמצא"/>
        }
        
        if(!this.state.loading){
            pageContent = (
                <>
                    <section className={classes.video} >
                        <YoutubeVideo id={this.state.skit.youtube_id} />
                    </section>
                    <section className={classes.admin}>
                        <Button design="Warning">
                            <Link to={`/skits/${this.state.skit.youtube_id}/edit`}>ערוך</Link>
                        </Button>
                        <form onSubmit={this.deleteSkitHandler}>
                            <Button design="Danger">מחק</Button>
                        </form>
                    </section>
                    <h1>{this.state.skit.name}</h1>
                    <section className={classes.description}>
                        <p>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.</p>
                        <Aired season={this.state.skit.aired.season} episode={this.state.skit.aired.episode}/>
                    </section>
                    <section className={classes.cast}>
                        <h2>משתתפים</h2>
                        <Cast cast={this.state.skit.actors} clicked={this.castClickHandler} />
                    </section>
                    <section className={classes.charecters}>
                        <h2>דמויות</h2>
                        <ul>
                            {[1,2,3,4].map((item, index) => {
                                return(
                                    <li key={index}>
                                        <Link to="" >
                                            <img src="bla" alt=""/>
                                            <h4>דמות {item}</h4>
                                        </Link>                                    
                                    </li>
                                )    
                            })}
                        </ul>
                    </section>
                    <section className={classes.comments}>
                        <Comments comments={this.state.skit.comments} />
                    </section>
                </>    
            )
        }
        return(
            <div className={classes.SkitShow}>
                {pageContent}
            </div>
        )
    }
}

export default withRouter(SkitShow);