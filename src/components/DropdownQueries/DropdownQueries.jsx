import './DropdownQueries.css';

const DropdownQueries = ({ sortBy, setSortBy, order, setOrder }) => {
	const handleSortOnChange = (e) => {
		setSortBy(e.target.value);
	};
	const handleOrderOnChange = (e) => {
		setOrder(e.target.value);
	};
	return (
		<section className="dropdown">
			<div>
				<label className="label-dropdown" htmlFor="sort_by">
					Sort articles by:
				</label>
				<select
					className="select-dropdown"
					name="sort_by"
					id="sort_by"
					value={sortBy}
					onChange={(e) => handleSortOnChange(e)}
				>
					<option selected value={'created_at'}>
						Date
					</option>
					<option value={'comment_count'}>Comments</option>
					<option value={'votes'}>Votes</option>
					<option value={'title'}>Title</option>
				</select>
			</div>
			<div>
				<label className="label-dropdown" htmlFor="order_by">
					Order:
				</label>
				<select
					className="select-dropdown"
					name="oder_by"
					id="order_by"
					value={order}
					onChange={(e) => handleOrderOnChange(e)}
				>
					<option selected value={'DESC'}>
						Descending
					</option>
					<option value={'ASC'}>Ascending</option>
				</select>
			</div>
		</section>
	);
};

export default DropdownQueries;
