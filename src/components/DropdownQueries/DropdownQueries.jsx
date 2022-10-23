const DropdownQueries = ({ sortBy, setSortBy, order, setOrder }) => {
	const handleSortOnChange = (e) => {
		setSortBy(e.target.value);
	};
	const handleOrderOnChange = (e) => {
		setOrder(e.target.value);
	};
	return (
		<section>
			<label htmlFor="sort_by">Sort articles by:</label>
			<select
				name="sort_by"
				id="sort_by"
				value={sortBy}
				onChange={(e) => handleSortOnChange(e)}
			>
				<option value={'created_at'}>Date</option>
				<option value={'comment_count'}>Comments</option>
				<option value={'votes'}>Votes</option>
			</select>
			<label htmlFor="order_by">Order:</label>
			<select
				name="oder_by"
				id="order_by"
				value={order}
				onChange={(e) => handleOrderOnChange(e)}
			>
				<option value={'DESC'}>Descending</option>
				<option value={'ASC'}>Ascending</option>
			</select>
		</section>
	);
};

export default DropdownQueries;