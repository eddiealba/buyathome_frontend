import { RouterModule, Routes } from '@angular/router'

import { SignupComponent } from './components/user/signup/signup.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { OrdersComponent } from './components/user/orders/orders.component';
import { OrderDetailComponent } from './components/user/order-detail/order-detail.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { AddproductComponent} from './components/product/addproduct/addproduct.component';
import { AddvoucherComponent} from './components/voucher/addvoucher/addvoucher.component';
import { EditproductComponent} from './components/product/editproduct/editproduct.component';
import { ListvoucherComponent} from './components/voucher/listvoucher/listvoucher.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CatalogueComponent } from './components/category/catalogue/catalogue.component';
import { GetproductsComponent} from './components/product/getproducts/getproducts.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { OrderaddComponent } from './components/createOrder/orderadd/orderadd.component';
import { FormComponent } from './components/usuarios/form.component';
import { FormeditComponent } from './components/usuarios/formedit.component';
import { HomeComponent } from './components/home/home.component';
import { ListproductComponent } from './components/product/listproduct/listproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ListproductcategoryComponent } from './components/product/listproductcategory/listproductcategory.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {ClientesComponent} from './components/clientes/clientes.component';

import { ProductosComponent} from './productos/productos.component';
import { FormpComponent } from './productos/formp.component';
import { FormpeditComponent } from './productos/formpedit.component';
import { DetalleComponent } from './productos/detalle/detalle.component';


const APP_ROUTES: Routes = [
    { path: 'category/catalogue', component: CatalogueComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user/signup', component: SignupComponent },
    { path: 'user/:id/profile', component: ProfileComponent },
    { path: 'user/:id/orders', component: OrdersComponent },
    { path: 'user/:userId/orders/:orderId', component: OrderDetailComponent },
    { path: 'user/:id/edit', component: UserEditComponent },
    { path: 'user/cart', component: CartComponent },
    { path: 'user/payment', component: PaymentComponent },
    { path: 'createOrder/orderadd', component: OrderaddComponent },
    { path: 'product/addproduct', component: AddproductComponent},
    { path: 'voucher/addvoucher', component: AddvoucherComponent},
    { path: 'product/editproduct/:productId', component: EditproductComponent},
    { path: 'voucher/listvoucher', component: ListvoucherComponent},
    { path: 'product/getproducts', component: GetproductsComponent},
    { path: 'usuarios/form', component: FormComponent},
    { path: 'listvoucher/form/:voucherId', component: FormComponent},
    { path: 'products', component: ListproductComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'product/:productId', component: ProductDetailComponent },
    { path: 'products/category/:id', component: ListproductcategoryComponent },
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'clientes', component: ClientesComponent},
    { path: 'usuarios/formedit', component: FormeditComponent},
    { path: 'usuarios/formedit/:idUsuario', component: FormeditComponent},
    { path: 'productos/page/:page', component: ProductosComponent},
    { path: 'productos', component: ProductosComponent},
    { path: 'productos/formp', component: FormpComponent},
    { path: 'productos/formpedit', component: FormpeditComponent},
    { path: 'productos/formpedit/:productId', component: FormpeditComponent},
    { path: 'productos/detalle/:productId', component: DetalleComponent},

    { path: '**', pathMatch: 'full', redirectTo: 'home' }//redirectTo: 'home'
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);