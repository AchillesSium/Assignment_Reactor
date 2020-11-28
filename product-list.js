new Vue({
    el: "#app",
    data () {
            return {
                products : [''],
                page: 1,
                perPage: 10,
                pages: [],	
                baseUrl: 'https://bad-api-assignment.reaktor.com/'
            }
        },
        methods:{
            getProducts (productCategory) {	
                fetch(this.baseUrl + 'products/' + productCategory)
                    .then(stream => stream.json())
                    .then(data => {
                        if (data) {
                            this.products = data
                        } else {
                            alert('Empty response. Please try again')
                        }
                    })
                    .catch(error => {
                        console.error("There was an error!", error);
                    });
            },
            setPages () {
                this.page = 1
                let numberOfPages = Math.ceil(this.products.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (products) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return products.slice(from, to);
            },
            checkStatus: function (product) {
                fetch(this.baseUrl + 'availability/' + product.manufacturer)
                    .then(stream => stream.json())
                    .then(data => {
                        if (data) {
                            let obj = data.response.find(o => o.id === product.id.toUpperCase());
                            if (obj && obj.DATAPAYLOAD){
                                cleanText = obj.DATAPAYLOAD.replace(/<\/?[^>]+(>|$)/g, "");
                                alert(cleanText)
                            }
                        } else {
                            alert('Empty response. Please try again')
                        }
                    })
                    .catch(error => {
                        console.error("There was an error!", error);
                    });
            },
            onSelectCategory(event) {
                this.getProducts(event.target.value)
            }
        },
        computed: {
            displayedProducts () {
                return this.paginate(this.products);
            }
        },
        watch: {
            products () {
                this.setPages();
            }
        },
        created(){
            this.getProducts('jackets');
        }
    })
