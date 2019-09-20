import React, { Component, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonMU from '@material-ui/core/Button';
import '../../css/Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import {InputGroup, DropdownButton, Dropdown, FormControl} from 'react-bootstrap'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import './Home.css'
import apiClient from '../../network/apiClient';


const neighborhoods = [
  {label:'פלורנטין',name:'florentine', value:205},
  {label:'הצפון הישן - צפון',name:'north_old_north', value:1483},
  {label:'הצפון הישן - דרום',name:'north_old_south', value:1461},
  {label:'הצפון החדש - דרום',name:'north_new_south', value:1519},
  {label:'הצפון הדש - צפון',name:'north_new_north', value:204},
  {label:'הגוש הגדול',name:'big_chunk', value:195},
  {label:'רמת אביב',name:'ramat_aviv', value:197},
  {label:'לב תל אביב',name:'heart_tel_aviv', value:1520}
]

const rooms = [ '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10' ]

const prices = [
  '0', '500', '1000', '1500', '2000', '2500', '3000',
  '3500', '4000', '4500', '6000', '6500', '7000', '7500',
  '8000', '8500', '9000', '9500', '10000'
]

const AlertComponent = props => {
  return (
    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <div style={{display:'flex', width:'100%'}}>
        <div className='input-neighborhood' style={{margin:'5%', marginLeft:'0px',textAlign:'right'}}>
          <label>שכונה</label>
          <Dropdown 
            //className={'input-neighborhood'}
            options={neighborhoods} 
            value={props.alerts[props.idx].neighborhood} 
            onChange={props.addNeighborhood}
            placeholder="בחר שכונה" 
          />
        </div>

        <div style={{margin:'5%', textAlign:'right'}}>
          <label>מספר חדרים</label>
          <div className='input-rooms' style={{display:'flex', flexDirection:'row'}}>
            <Dropdown 
              //className={'input-rooms'}
              options={rooms} 
              onChange={props.addToRooms} 
              value={props.alerts[props.idx].toRooms}
              placeholder="עד"
              
            />
            {/* <h3>-</h3> */}
            <Dropdown 
              //className={'input-rooms'}
              options={rooms} 
              onChange={props.addFromRooms} 
              value={props.alerts[props.idx].fromRooms}
              placeholder="החל"
              
            />
          </div>
        </div>
        
        <div style={{margin:'5%', textAlign:'right'}}>
          <label>בחר מחיר</label>
          <div className='input-price' style={{display:'flex', flexDirection:'row'}}>
          <Dropdown 
            //className={'input-price'}
            placeholder="עד"
            options={prices} 
            onChange={props.addToPrice} 
            value={props.alerts[props.idx].toPrice}
          />
          {/* <h3>-</h3> */}
          <Dropdown 
            //className={'input-price'}
            placeholder="החל"
            options={prices} 
            onChange={props.addFromPrice} 
            value={props.alerts[props.idx].fromPrice}
          />
          </div>
          
          {/* <button style={{marginTop:'5px'}} onClick={props.removeAlert}>מחק התראה</button> */}
        </div>
      </div>
      <i style={{fontSize:30, color:'red', marginTop:'25px', cursor:'pointer'}} onClick={props.removeAlert} className="fa fa-trash"></i>
    </div> 
  )
}

const Home = props => { 
  const [alerts, addAlert] = useState([])
  const [email, addEmail] = useState('')


  async function addAlertstoDb(alerts, email) {
    console.log('alerts\n', alerts)
    try {
      const res = await apiClient.addAlertstoDb(alerts, email)  
      alert(res.data)
    } catch(e) {
      console.log(e)
      alert(e)
    }
  }

  function addFromPrice(idx) {
    return function(val) {
      const nextAlerts = [...alerts]
      nextAlerts[idx].fromPrice = val
      addAlert(nextAlerts) 
    }
  }

  function addToPrice(idx) {
    return function(val) {
      const nextAlerts = [...alerts]
      nextAlerts[idx].toPrice = val
      addAlert(nextAlerts)
    }
  }

  function addFromRooms(idx) {
    return function(val) {
      const nextAlerts = [...alerts]
      nextAlerts[idx].fromRooms = val
      addAlert(nextAlerts)
    }
  }

  function addToRooms(idx) {
    return function(val) {
      const nextAlerts = [...alerts]
      nextAlerts[idx].toRooms = val
      addAlert(nextAlerts)
    }
  }

  function addNeighborhood(idx) {
    return function(val) {
      const nextAlerts = [...alerts]
      nextAlerts[idx].neighborhood = val
      addAlert(nextAlerts)
    }
  }

  function removeAlert(idx) {
    addAlert([...alerts.slice(0, idx), ...alerts.slice(idx+1)])
  }

  console.log(alerts)
  return (
    <div>
      <button onClick={() => addAlert([...alerts, {}])}>התראה חדשה</button>
      <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
        <div className='alerts-container'>
          {
            alerts.map((alert, idx) => (
              <AlertComponent 
                key={idx}
                addFromPrice={addFromPrice(idx)}
                addToPrice={addToPrice(idx)}
                addFromRooms={addFromRooms(idx)}
                addToRooms={addToRooms(idx)}
                addNeighborhood={addNeighborhood(idx)}
                removeAlert={() => removeAlert(idx)}
                alerts={alerts}
                idx={idx}
              />
            ))
          }

          {
            alerts.length ?
            <div style={{marginTop:'30px'}}>
              <input placeholder='enter email' onChange={e => addEmail(e.target.value)}/>
              <button onClick={() => addAlertstoDb(alerts, email)}>send</button>
            </div> : null
          }
        </div>
      </div>
    </div>
  );
}


export default Home;
