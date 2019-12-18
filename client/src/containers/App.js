import React, { useEffect, useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { initCast } from '../store/actions/cast'

import Layout from '../containers/Layout/Layout';
import SkitsIndex from './Skits/SkitIndex/SkitIndex';
import SkitShow from './Skits/SkitShow/SkitShow';
import SkitNew from './Skits/SkitNew/SkitNew';
import SkitEdit from './Skits/SkitEdit/SkitEdit';
import CastShow from './Cast/CastShow/CastShow'
import PageNotFound from './PageNotFound/PageNotFound';
import CastIndex from './Cast/CastIndex/CastIndex';

import './App.scss'

const App = () => {
	const dispatch = useDispatch();
	const onInitCast = useCallback(() => dispatch(initCast()), [dispatch]); 

	useEffect( () => {
		onInitCast();
	}, [onInitCast]);

	return (
		<BrowserRouter>
			<div className="App">
				<Layout>
					<Switch>
						<Route path="/" exact component={SkitsIndex} />
						<Route path="/skits/add" exact component={SkitNew} />
						<Route path="/skits/:id/edit" exact component={SkitEdit} />
						<Route path="/skits/:id" exact component={SkitShow} />
						<Route path="/skits" component={SkitsIndex} />
						<Route path="/cast/:id" exact component={CastShow} />
						<Route path="/cast/" exact component={CastIndex} />
						<Route component={PageNotFound}/>
					</Switch>
				</Layout>
			</div>
		</BrowserRouter>
	);
}

export default App;
