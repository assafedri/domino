import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Skit from './Skit/Skit';
import Expand from './Skit/Expand/Expand';

import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input';

import classes from './Skits.module.scss';


const Skitlist = (props) => {
    const [filtered, setFiltered] = useState(props.skits);
    const [expand, setExpand] = useState({show: false, item: null});
    const [memberId, setMemberId] = useState(props._id)
    const [search, setSearch] = useState('');
    const [listClasses, setListClasses] = useState([classes.Skitlist]);

    useEffect( () => {
        if(props.id !== memberId){
            setFiltered(props.skits)
            setMemberId(props.id);
            setSearch('')
        }
    },[props.id, props.skits, memberId])

    const skitClickHandler = (e, skit) => setExpand({show: true, item: skit});
    const skitViewCloseHandler = () => setExpand({show: false, item: null});

    const filterhandler = e => {
        const etv = e.target.value;
        setSearch(etv);
        setFiltered( props.skits.filter( sk => sk.name.includes(etv) ));
        setListClasses(etv ? [classes.Skitlist, classes.Filtered] : [classes.Skitlist])
    }

    return(
        <>
            <Modal show={expand.show} modalClosed={skitViewCloseHandler}>
                <Expand skit={expand.item} />
            </Modal>
            <section className={classes.Skits}>
                {props.title ? <h2>{props.title} ({filtered.length})</h2> : null}

                <Input 
                    elmType="text"
                    value={search}
                    changed={filterhandler}
                    config={{label: 'חפש מערכון לפי שם'}}  />

                <div className={listClasses.join(' ')}>
                    { filtered.length > 0 ?
                        filtered.map( skit => {
                            return(
                                <Skit
                                    key={skit._id} 
                                    skit={skit} 
                                    clicked={(e) => skitClickHandler(e,skit)}
                                />
                            ) 
                        })
                    : 
                        <span>לא נמצאו מערכונים</span>
                    }
                </div>
            </section>
        </>

    )

}
export default withRouter(Skitlist);