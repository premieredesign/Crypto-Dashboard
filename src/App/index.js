import React, { Component } from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Dashboard from '../Dashboard'
import Settings from '../Settings';
import Content from '../Shared/Content';

export default class App extends Component {
  render() {
      return (
          <AppLayout>
              <AppProvider>
                  <AppBar/>
                  <Content>
                      <Dashboard/>
                      <Settings/>
                  </Content>
              </AppProvider>
          </AppLayout>
      );
  }
}

