
import {createRouter,createWebHistory} from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            // path:'/',
            // component:()=>import("../components/Layout/Layout.vue")
        },
        {
            path:'/trademark',
            component:()=>import("../pages/products/tradeMark.vue")
        },
        {
            path:'/attr',
            component:()=>import("../pages/products/Attr.vue")
        },{
            path:'/login',
            component:()=>import("../pages/products/Login.vue")
        }
    ]
})
export default router
