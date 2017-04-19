import React, { PropTypes } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const Posts = ({posts}) => {

	posts.map(post => {
			post.description = post.description.replace(/<\/?[^>]+(>|$)/g, "")
			return post
		}
	)

	return (
	  <Table>
	  	<TableHeader>
		  	<TableRow>
		  	<TableHeaderColumn style={{width: '25%'}}>Book Title</TableHeaderColumn>
		  	<TableHeaderColumn style={{width: '10%'}}>Price</TableHeaderColumn>
		  	<TableHeaderColumn style={{width: '65%'}}>Description</TableHeaderColumn>
		  	</TableRow>
	  	</TableHeader>
	  	<TableBody>
		    {posts.map((post, i) =>
		      <TableRow key={i}>
		      	<TableRowColumn style={{width: '25%'}}>{post.trackName}</TableRowColumn>
		      	<TableRowColumn style={{width: '10%'}}>{post.formattedPrice}</TableRowColumn>
		      	<TableRowColumn style={{width: '65%'}}>{post.description}</TableRowColumn>
		      	
		      	</TableRow>
		    )}
	    </TableBody>
	  </Table>
	)
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
