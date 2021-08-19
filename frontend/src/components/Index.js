import React, { Component } from 'react'

export default class Index extends Component {
	constructor(props) {
		super(props)

		this.state = {
			rootCategories: [],
			products: []
		}
	}

	componentDidMount = () => {
		fetch("http://localhost:8000/rootCategory")
			.then((response) => response.json())
			.then((rootCategories) => {
				console.log(rootCategories);
				this.setState({ rootCategories: rootCategories });
			})
			.catch((err) => {
				console.log(err);
			});

		fetch("http://localhost:8000/products")
			.then((response) => response.json())
			.then((products) => {
				console.log(products);
				this.setState({ products: products });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	gotoRootCategory = (root_category) => {
		localStorage.setItem('root_category', root_category);
		this.props.history.push("/category");
	}

	render() {
		return (
			<div>
				<div className="cat_container">
					<ul>
						{
							this.state.rootCategories.map((category, index) => {
								return (
									<li key={index} onClick={() => { this.gotoRootCategory(category._id) }}>{category._id + "(" + category.count + ")"}</li>
								)
							})
						}
					</ul>
				</div>

				<div className="product_container">
					<table className="table table-bordered table-strip">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.products.map((product, index) => {
									return (
										<tr key={index}>
											<td>{product.pname}</td>
											<td>{product.price}</td>
										</tr>
									)
								})
							}

						</tbody>

					</table>
				</div>

			</div>
		)
	}
}
