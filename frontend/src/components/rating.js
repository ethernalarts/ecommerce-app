import React from 'react'


export default function Rating({value, text, color}) {
    return (
        <div className='rating'>
            {/* one star */}
            <span>
                <i style={{ color }} className={
                    value >= 1
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'fa-regular fa-star'
                }>
                </i>
            </span>
            
            {/* two stars */}
            <span>
                <i style={{ color }} className={
                    value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'fa-regular fa-star'
                }>
                </i>
            </span>
            
            {/* three stars */}
            <span>
                <i style={{ color }} className={
                    value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'fa-regular fa-star'
                }>
                </i>
            </span>
            
            {/* four stars */}
            <span>
                <i style={{ color }} className={
                    value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'fa-regular fa-star'
                }>
                </i>
            </span>
            
            {/* five stars */}
            <span>
                <i style={{ color }} className={
                    value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'fa-regular fa-star'
                }>
                </i>
            </span>
            
            {/* number of reviews */}
            <span className='ml-8'>{ text && text }</span>
        </div>
  )
}
