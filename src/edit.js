import { __ } from '@wordpress/i18n';
import { useBlockProps,	InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl,	ColorPalette } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';


export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { 
		label, 
		size, 
		starsGap, 
		labelGap, 
		labelColor, 
		starColor, 
		noOfStars, 
		ratingStars 
	} = attributes;


  const fullstar = <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={starColor} class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
	const halfstar = <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={starColor} class="bi bi-star-half" viewBox="0 0 16 16"><path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/></svg>
	const nostar   = <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={starColor} class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>

	
  const [u_star, setu_star] = useState()

	useEffect( ()=>{
		let resultarray = []
		for( let i=0; i<noOfStars; i++ ) {
			if ( ratingStars>i+0.5 ) { resultarray.push(fullstar) }
			else if ( ratingStars == (i + 0.5)) { resultarray.push(halfstar) }
			else resultarray.push(nostar)
		}		

		setu_star(resultarray)
	},[ noOfStars, ratingStars, starColor, size ])

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'General', 'rating-stars-block' ) }>
					<RangeControl
						label={ __( 'No of stars', 'rating-stars-block' ) }
						value={ noOfStars }
						min={ 0 }
						max={ 10 }
						step={ 1 }
						onChange={ (newval)=> setAttributes({noOfStars: newval }) }
					/>

					<RangeControl
						label={ __( 'Rating Stars', 'rating-stars-block' ) }
						value={ ratingStars }
						min={ 0 }
						max={ noOfStars }
						step={ 0.5 }
						onChange={ (newval)=> setAttributes({ratingStars: newval }) }
					/>
				
					<RangeControl
						label={ __( 'Size', 'rating-stars-block' ) }
						value={ size }
						min={ 0 }
						max={ 100 }
						step={ 1 }
						onChange={ (newval)=> setAttributes({size: newval }) }
					/>						

					{ __( 'Stars Color', 'rating-stars-block' ) }
					<ColorPalette 
						label={ __( 'Stars Color', 'rating-stars-block' ) }
						disableCustomColors={ false } 
						clearable={ false }						
						enableAlpha={ true }
						value={ starColor }
						onChange={ ( newval )=> setAttributes({starColor: newval }) }
					/>

					<RangeControl
						label={ __( 'Stars Gap', 'rating-stars-block' ) }
						value={ starsGap }
						min={ 0 }
						max={ 100 }
						step={ 1 }
						onChange={ (newval)=> setAttributes({starsGap: newval }) }
					/>

					<TextControl
						label={ __( 'Label', 'rating-stars-block' ) }
						value={ label }						
						onChange={ ( newval ) => setAttributes({label: newval }) }				
					/>
 
 					{ __( 'Label Color', 'rating-stars-block' ) }
 					<ColorPalette 			
						disableCustomColors={ false } 
						clearable={ false }				
						enableAlpha={ true }
						value={ labelColor }
						onChange={ ( newval )=> setAttributes( { labelColor: newval } ) }
					/>
					
					<RangeControl
						label={ __( 'Label Gap', 'rating-stars-block' ) }
						value={ labelGap }
						min={ 0 }
						max={ 100 }
						step={ 1 }
						onChange={ (newval)=> setAttributes({labelGap: newval }) }
					/>

				</PanelBody>
			</InspectorControls>			

			<div { ...useBlockProps( {	style:{ gap: labelGap + 'px'}	} ) }	> 
				<label style={{color: labelColor }}>{ label }</label>
				<span style={{ gap:starsGap + 'px' }}>{u_star}</span>			
			</div>
		</>
	);
}
