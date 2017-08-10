/**
 * Created by samw on 8/9/17.
 */
import _ from 'lodash'



export function dataReadyForDisplay(data){
    return data && data.length >=2 && !isRangeZero(data)
}


function isRangeZero(data){
    const [min, max] = getRange(data)
    return min === max
}

//get min and max of data array
export function getRange(data){
    const values = _.map(data, 'value')
    return [_.min(values), _.max(values)]
}



//adjust min and max if it is a single value, because it makes the chart look bad
export function getAdjustedRange(data){
    const [min, max] = getRange(data)
    if(min === max){
        const minFraction = min * .1
        return [min - minFraction, min + minFraction]
    }
}