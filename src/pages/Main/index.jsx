import React from 'react';
import styles from  './Main.module.scss';
import {useHistory} from 'react-router-dom'
export default function Main() {
  useHistory().push('/sign-in')
  return (
    <div className={styles.container}>
    </div>
  );
}
