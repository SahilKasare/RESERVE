const head1=document.querySelector('#head1');
const head2=document.querySelector('#head2');
const head3=document.querySelector('#head3');

const walletContent = document.getElementById('walletContent');
const depositContent = document.getElementById('depositContent');
const refundsContent = document.getElementById('refundsContent');
const depinwall=document.querySelector('#bal button');
const depindep=document.querySelector('#dep button');


transactions=[{
    type:1,
    amount:'₹580',
    transactionId:'T45328',
    from:'carrepair.pvt.Ltd',
    ManagerId:'M87984',
    bookingId:'345663'

},
{  
    type:0,
    amount:'₹340',
    transactionId:'T99928',
    from:'carmech.pvt.Ltd',
    ManagerId:'M00654',
    bookingId:'254073'

},

{   
    type:1,
    amount:'₹160',
    transactionId:'T41624',
    from:'automate.pvt.Ltd',
    ManagerId:'M99922',
    bookingId:'456773'

},

{   type:0,
    amount:'₹960',
    transactionId:'T95655',
    from:'caratoz.pvt.Ltd',
    ManagerId:'M00654',
    bookingId:'905733'

},

{
    type:1,
    amount:'₹675',
    transactionId:'T55528',
    from:'carrepair.pvt.Ltd',
    ManagerId:'M10544',
    bookingId:'783653'

},
{  
    type:0,
    amount:'₹111',
    transactionId:'T89700',
    from:'carmech.pvt.Ltd',
    ManagerId:'M06524',
    bookingId:'764533'

},

{   
    type:0,
    amount:'₹783',
    transactionId:'T98424',
    from:'automate.pvt.Ltd',
    ManagerId:'M96522',
    bookingId:'786543'

},

{   type:0,
    amount:'₹765',
    transactionId:'T77765',
    from:'caratoz.pvt.Ltd',
    ManagerId:'M89624',
    bookingId:'909753'

},



]

function showWalletContent() {
    walletContent.classList.remove('display-none');
    depositContent.classList.add('display-none');
    refundsContent.classList.add('display-none');
    refundsContent.innerHTML = '';
}


function showDepositContent() {
    walletContent.classList.add('display-none');
    depositContent.classList.remove('display-none');
    refundsContent.classList.add('display-none');
    refundsContent.innerHTML = '';
    
}



   
    function showRefundsContent() {
        walletContent.classList.add('display-none');
        depositContent.classList.add('display-none');
        refundsContent.classList.remove('display-none');
    
        
        refundsContent.innerHTML = '';
    
     
        refunds.forEach(function(refund) {
            var div = document.createElement("div");
            div.className = "flex-col";
            div.id = "ref";
           
            var incDiv=document.createElement("div");
            incDiv.className = "inc";
            incDiv.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#00D25B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.343 4.343l11.314 11.314m0 0h-9.9m9.9 0v-9.9"></path> </g></svg>';
        div.appendChild(incDiv);
            var amountLabelSpan = document.createElement("span");
            amountLabelSpan.className = "label";
            amountLabelSpan.textContent = "Amount: ";
            div.appendChild(amountLabelSpan);
    
            
            var amountDiv = document.createElement("div");
            amountDiv.className = "refcont";
            amountDiv.textContent = refund.amount;
            div.appendChild(amountDiv);
    
            
            var tidLabelSpan = document.createElement("span");
            tidLabelSpan.className = "label";
            tidLabelSpan.textContent = "Transaction Id: ";
            div.appendChild(tidLabelSpan);
    
            var transactionIdDiv = document.createElement("div");
            transactionIdDiv.className = "refcont";
            transactionIdDiv.textContent = refund.transactionId;
            div.appendChild(transactionIdDiv);
    
            var fromLabelSpan = document.createElement("span");
            fromLabelSpan.className = "label";
            fromLabelSpan.textContent = "From: ";
            div.appendChild(fromLabelSpan);
    
            var fromDiv = document.createElement("div");
            fromDiv.className = "refcont";
            fromDiv.textContent = refund.from;
            div.appendChild(fromDiv);
    
            var bidLabelSpan = document.createElement("span");
            bidLabelSpan.className = "label";
            bidLabelSpan.textContent = "Booking Id: ";
            div.appendChild(bidLabelSpan);
    
            var bookingIdDiv = document.createElement("div");
            bookingIdDiv.className = "refcont";
            bookingIdDiv.textContent = refund.bookingId;
            div.appendChild(bookingIdDiv);
    
            refundsContent.appendChild(div);
        });
    }
    

head1.onclick=function(){
    
head1.classList.add('headsel');
head2.classList.remove('headsel');
head3.classList.remove('headsel');

showWalletContent();
}

head2.onclick=function(){
  ;
    head2.classList.add('headsel');
    head1.classList.remove('headsel');
    head3.classList.remove('headsel');
    showDepositContent();
   
    }

    head3.onclick=function(){
    
        head3.classList.add('headsel');

        head2.classList.remove('headsel');
        head1.classList.remove('headsel');
        showRefundsContent();
        
        ;
        }

       head1.onmouseover=function(){
        this.style.cursor='pointer';
      
       }

       head2.onmouseover=function(){
        this.style.cursor='pointer';
         
       }

       head3.onmouseover=function(){
        this.style.cursor='pointer';
     
       }

       depinwall.addEventListener("click", function() {
        head2.classList.add('headsel');
    head1.classList.remove('headsel');
    head3.classList.remove('headsel');
       showDepositContent();
    });

    





transactions.forEach(function(transaction) {
    var div = document.createElement("div");
    div.className = "flex-col";
    div.classList.add('transaction')
    div.id = "searchinside";
   
    var incDiv=document.createElement("div");
    if(transaction.type==1){
    incDiv.className = "inc";
    incDiv.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#00D25B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.343 4.343l11.314 11.314m0 0h-9.9m9.9 0v-9.9"></path> </g></svg>';
    }
    else{
        incDiv.className = "dec";
    incDiv.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#FC424A" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.657 15.657L4.343 4.343m0 0h9.9m-9.9 0v9.9"></path> </g></svg>';
    }
    div.appendChild(incDiv);
    var amountLabelSpan = document.createElement("span");
    amountLabelSpan.className = "label";
    amountLabelSpan.textContent = "Amount: ";
    div.appendChild(amountLabelSpan);

    
    var amountDiv = document.createElement("div");
    amountDiv.className = "refcont";
    amountDiv.classList.add('flex-row');
    amountDiv.textContent = transaction.amount;
    div.appendChild(amountDiv);

    
    var tidLabelSpan = document.createElement("span");
    tidLabelSpan.className = "label";
    tidLabelSpan.textContent = "Transaction Id: ";
    div.appendChild(tidLabelSpan);

    var transactionIdDiv = document.createElement("div");
    transactionIdDiv.className = "refcont";
    transactionIdDiv.textContent = transaction.transactionId;
    div.appendChild(transactionIdDiv);

    var fromLabelSpan = document.createElement("span");
    fromLabelSpan.className = "label";
    if(transaction.type==1){
        fromLabelSpan.textContent = "From: ";
    }
    else{
        fromLabelSpan.textContent = "To: ";
    }
   
    div.appendChild(fromLabelSpan);

    var fromDiv = document.createElement("div");
    fromDiv.classList.add('flex-row');
    fromDiv.className = "refcont";
    fromDiv.textContent = transaction.from;
    div.appendChild(fromDiv);

    var midLabelSpan = document.createElement("span");
    midLabelSpan.className = "label";
    midLabelSpan.textContent = "ManagerId: ";
    div.appendChild(midLabelSpan);
    var midDiv = document.createElement("div");
    midDiv.classList.add('flex-row');
    midDiv.className = "refcont";
    midDiv.textContent = transaction.ManagerId;
    div.appendChild(midDiv);

    
    var bidLabelSpan = document.createElement("span");
    bidLabelSpan.className = "label";
    bidLabelSpan.textContent = "Booking Id: ";
    div.appendChild(bidLabelSpan);

    var bookingIdDiv = document.createElement("div");
    bookingIdDiv.className = "refcont";
    bookingIdDiv.textContent = transaction.bookingId;
    div.appendChild(bookingIdDiv);

    searches.appendChild(div);
});
refunds=[{
    amount:'₹580',
    transactionId:'T45328',
    from:'carrepair.pvt.Ltd',
    ManagerId:'M87654',
    bookingId:'345663'

},
{
    amount:'₹340',
    transactionId:'T99928',
    
    from:'carmech.pvt.Ltd',
    ManagerId:'M49854',
    bookingId:'254073'

},

{
    amount:'₹160',
    transactionId:'T41624',
    ManagerId:'M99664',
    from:'automate.pvt.Ltd',
    bookingId:'456773'

},

{
    amount:'₹960',
    transactionId:'T95655',
    
    from:'caratoz.pvt.Ltd',
    bookingId:'905733'

},
]



