import React from 'react';
import { Link } from 'react-router-dom';

export default function BusinessLink({ id, name, subHeading, image, all_data }) {
  return(
    <>
      <div style={styles.linkContainer}>
        <h3>{name}</h3>
        <Link
          to={`/business/${id}`}
          state={{all_data: all_data}}
        >
          <div style={{ textAlign: 'center' }}>
            <img src={image} alt={subHeading} height={'100%'} width={'100%'}/>
          </div>
        </Link>
        <p>{subHeading}</p>
      </div>
    </>
  )
};

const styles = {
  linkContainer: {
    border: 'solid 1px black',
    borderRadius: 7,
    width: '175px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
