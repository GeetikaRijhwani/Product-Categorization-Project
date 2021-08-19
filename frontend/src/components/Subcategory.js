import React, { Component } from 'react'

export default class Subcategory extends Component {
	constructor(props) {
		super(props)

		this.state = {
			catL2: [],
			products: []
		}
		this.rootCat = localStorage.getItem('root_category');
		this.catL1 = localStorage.getItem('catL1');
	}

	componentDidMount = () => {
		fetch("http://localhost:8000/categoryL2/" + this.rootCat + "/" + this.catL1)
			.then((response) => response.json())
			.then((catL2) => {
				console.log(catL2);
				this.setState({ catL2: catL2 });
			})
			.catch((err) => {
				console.log(err);
			});

		fetch("http://localhost:8000/categoryL1Products/" + this.rootCat + "/" + this.catL1)
			.then((response) => response.json())
			.then((products) => {
				console.log(products);
				this.setState({ products: products });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	gotoCatL2 = (catL2) => {
		localStorage.setItem('catL2', catL2);
		this.props.history.push("/category/subcategory/product");
	}


	render() {
		return (
			<div>
				<div className="cat_container">
					<ul>
						{
							this.state.catL2.map((category, index) => {
								return (
									<li key={index} onClick={() => { this.gotoCatL2(category._id.cat_l2) }}>{category._id.cat_l2 + "(" + category.count + ")"}</li>
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
