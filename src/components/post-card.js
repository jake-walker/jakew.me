import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { convertToBgImage } from 'gbimage-bridge';
import BackgroundImage from 'gatsby-background-image';
import { AlignLeft, BookOpen } from 'react-feather';

const PostCard = ({ post, size = "regular" }) => {
  const featureImage = getImage(post.frontmatter.feature?.image) || null;
  const bgFeatureImage = convertToBgImage(featureImage);

  if (size === 'regular') {
    return (
      <Card className="mb-4">
        {featureImage && <GatsbyImage className="card-img-top" image={featureImage} alt={post.frontmatter.title}/>}
        <Card.Body>
          <Card.Title>{post.frontmatter.title}</Card.Title>
          <Card.Text>
            {post.frontmatter.description || post.excerpt}
          </Card.Text>
          <Link to={'/' + post.frontmatter.slug} className="btn btn-primary"><BookOpen className="me-1"/> Read</Link>
        </Card.Body>
        <Card.Footer className="text-muted text-end">
          {post.frontmatter.date} &bull; {post.timeToRead} min
        </Card.Footer>
      </Card>
    )
  } else {
    return (
      <Card className="mb-4">
        <Row className="g-0">
          <Col sm={12} md={4} className="mobile-height">
            {featureImage
              ? <BackgroundImage className="img-fluid rounded-start w-100 h-100" {...bgFeatureImage}/>
              : <div className="bg-light w-100 h-100 d-flex">
                  <AlignLeft size={48} color="grey" className="my-auto mx-auto"/>
                </div>
            }
          </Col>
          <Col sm={12} md={8}>
            <Card.Body>
              <Card.Title>{post.frontmatter.title}</Card.Title>
              <Card.Text>
                {post.frontmatter.description || post.excerpt}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">
                  {post.frontmatter.date} &bull; {post.timeToRead} min
                </small>
              </Card.Text>
              <Link to={'/' + post.frontmatter.slug} className="btn btn-primary"><BookOpen className="me-1"/> Read</Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default PostCard
