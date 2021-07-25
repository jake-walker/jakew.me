import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostCard = ({ post }) => {
  const featureImage = getImage(post.frontmatter.feature?.image) || null;

  return (
    <Card className="mb-4">
      {featureImage && <GatsbyImage className="card-img-top" image={featureImage} alt={post.frontmatter.title}/>}
      <Card.Body>
        <Card.Title>{post.frontmatter.title}</Card.Title>
        <Card.Text>
          {post.frontmatter.description || post.excerpt}
        </Card.Text>
        <Link to={'/' + post.frontmatter.slug} className="btn btn-primary">Read</Link>
      </Card.Body>
      <Card.Footer className="text-muted text-end">
        {post.frontmatter.date} &bull; {post.timeToRead} min
      </Card.Footer>
    </Card>
  )
}

export default PostCard
