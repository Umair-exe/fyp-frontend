import React, { useEffect, useState } from 'react'
import Rules from "../components/Rules";
import {data} from '../data';


const RulesPage = () => {
    const rules = data;
    const [rule, setRule] = useState([]);
    const [activeRule,SetActiveRule] = useState('');
  
    useEffect(() => {
      setRules()
    },[activeRule]);
  
    const setRules = () => {
      return setRule(() => rules.filter(data => data.class === activeRule.slice(0,1)));
    }
  
    return (
      <div className='p-6 px-20'>
        <Rules SetActiveRule={SetActiveRule} rules={rule} activeRule={activeRule} />
      </div>
    );
}

export default RulesPage