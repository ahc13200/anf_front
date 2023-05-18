/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 21:42:06 GMT-04:00 2023  
*@time Wed May 17 21:42:06 GMT-04:00 2023  
*/
const requireModule = require.context("@/", true, /(route.js$)/);
let router_array = []
requireModule.keys().forEach((fileName, index) => {
        const elem = {...requireModule(fileName)}
        router_array=router_array.concat(...Object.values(elem))
    }
)
export default router_array;
