(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[5],{103:function(e,r,n){e.exports={Order:"Order_Order__3kYZJ"}},107:function(e,r,n){"use strict";n.r(r);var t=n(3),a=n(4),i=n(6),o=n(5),u=n(7),s=n(0),c=n.n(s),d=n(20),p=n(14),l=n(103),m=n.n(l),b=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map((function(e){return c.a.createElement("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid #ccc",padding:"5px"},key:e.name},e.name," (",e.amount,")")}));return c.a.createElement("div",{className:m.a.Order},c.a.createElement("p",null,"Ingredients: ",t),c.a.createElement("p",null,"Price: ",c.a.createElement("strong",null,Number.parseFloat(e.price).toFixed(2),"\u20ac")))},h=n(44),f=n(24),g=n(43),O=function(e){function r(){return Object(t.a)(this,r),Object(i.a)(this,Object(o.a)(r).apply(this,arguments))}return Object(u.a)(r,e),Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=c.a.createElement(g.a,null);return this.props.loading||(e=c.a.createElement("div",null,this.props.orders.map((function(e){return c.a.createElement(b,{key:e.id,ingredients:e.ingredients,price:e.price})})))),e}}]),r}(s.Component);r.default=Object(p.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,n){return e(f.b(r,n))}}}))(Object(h.a)(O,d.a))}}]);
//# sourceMappingURL=5.d6d4bab2.chunk.js.map