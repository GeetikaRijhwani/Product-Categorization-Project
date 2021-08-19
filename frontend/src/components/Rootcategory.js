import React, { Component } from 'react'

export default class Rootcategory extends Component {
	constructor(props) {
		super(props)

		this.state = {
			catL1: [],
			products: []
		}
	}

	componentDidMount = () => {
		let rootCat = localStorage.getItem('root_category');
		fetch("http://localhost:8000/categoryL1/" + rootCat)
			.then((response) => response.json())
			.then((catL1) => {
				console.log(catL1);
				this.setState({ catL1: catL1 });
			})
			.catch((err) => {
				console.log(err);
			});

		fetch("http://localhost:8000/rootCategoryProducts/" + rootCat)
			.then((response) => response.json())
			.then((products) => {
				console.log(products);
				this.setState({ products: products });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	gotoCatL1 = (catL1) => {
		localStorage.setItem('catL1', catL1);
		this.props.history.push("/category/subcategory");
	}

	render() {
		return (
			<div>
				<div className="cat_container">
					<ul>
						{
							this.state.catL1.map((category, index) => {
								return (
									<li key={index} onClick={() => { this.gotoCatL1(category._id.cat_l1) }}>{category._id.cat_l1 + "(" + category.count + ")"}</li>
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
