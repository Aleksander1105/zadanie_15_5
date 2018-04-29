const KEY = 'UF51PbByi3jHbgAqlZvhlolVu7A2d03I';

App = React.createClass({

	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});

		this.getGif(searchingText).then(function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}
		.bind(this))
		.catch(function (error) {
			console.log(error);
		});
	},

	getGif: function(searchingText) {
    	return new Promise(
        	function (resolve, reject) {
            	const url = 'https://api.giphy.com' + '/v1/gifs/random?api_key=' + KEY + '&tag=' + searchingText; 
    	    	const xhr = new XMLHttpRequest();
    	    	xhr.open('GET', url);
            	xhr.onload = function () {
                	if (xhr.status === 200) {
                		const data = JSON.parse(xhr.responseText).data 
            			const gif = {  
                	   		url: data.fixed_width_downsampled_url,
                	   		sourceUrl: data.url 
                    	} 
                    	resolve(gif);
                	} 
                	else {
                    	reject(new Error(xhr.statusText)); 
                	} 
            	};

            	xhr.onerror = function () {
                	reject(new Error(
                  	 `XMLHttpRequest Error: ${xhr.statusText}`));
            	};

            	xhr.send();
        	}
        );	
    },  

	render: function() {

		const styles = {
			margin: "0 auto",
			textAlign: "center",
			width: "90%"
		};

		return (
			<div style={styles}>
					<h1>Wyszukiwarka GIFów</h1>
					<p>
					Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter, aby pobrać kolejne gify.
					</p>
					<Search onSearch={this.handleSearch} />
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});