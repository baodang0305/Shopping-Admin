// Dashboard 1 Morris-char
Morris.Area({
        element: 'morris-area-chart',
        data: [
            {   
                period: '2013',
                Total: document.getElementById('total13').innerHTML,
            }, {
                period: '2014',
                Total: document.getElementById('total14').innerHTML,
                
            }, {
                period: '2015',
                Total: document.getElementById('total15').innerHTML,
            
            }, {
                period: '2016',
                Total: document.getElementById('total16').innerHTML,
                
            }, {
                period: '2017',
                Total: document.getElementById('total17').innerHTML,
            
            },{
                period: '2018',
                Total: document.getElementById('total18').innerHTML,
            
            }, {
                period: '2019',
                Total: document.getElementById('total19').innerHTML,
            
            }, {
                period: '2020',
                Total: document.getElementById('total20').innerHTML,
            
            } 
        ],
        xkey: 'period',
        ykeys: ['Total'],
        labels: ['Total'],
        pointSize: 0,
        fillOpacity: 0.6,
        pointStrokeColors:['#00b5c2'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth:0,
        hideHover: 'auto',
        lineColors: ['#00b5c2'],
        resize: true
        
    });

    Morris.Area({
        element: 'extra-area-chart',
        data: [{
                    period: '2012',
                    Bags: 0,
                    Shoes: 0,
                    Jewelery: 0
                }, {
                    period: '2013',
                    Bags: 50,
                    Shoes: 15,
                    Jewelery: 5
                }, {
                    period: '2014',
                    Bags: 20,
                    Shoes: 50,
                    Jewelery: 65
                }, {
                    period: '2015',
                    Bags: 60,
                    Shoes: 12,
                    Jewelery: 7
                }, {
                    period: '2016',
                    Bags: 30,
                    Shoes: 20,
                    Jewelery: 120
                }, {
                    period: '2017',
                    Bags: 25,
                    Shoes: 80,
                    Jewelery: 40
                }, {
                    period: '2018',
                    Bags: 10,
                    Shoes: 10,
                    Jewelery: 10
                }


                ],
                lineColors: ['#f75b36', '#00b5c2', '#8698b7'],
                xkey: 'period',
                ykeys: ['Bags', 'Shoes', 'Jewelery'],
                labels: ['Bags', 'Shoes', 'Jewelery'],
                pointSize: 0,
                lineWidth: 0,
                resize:true,
                fillOpacity: 0.8,
                behaveLikeLine: true,
                gridLineColor: '#e0e0e0',
                hideHover: 'auto'
        
    });