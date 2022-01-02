import { Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import * as React from 'react';
import {
  Card, Row, Col,
} from 'react-bootstrap';
import { convertToBgImage } from 'gbimage-bridge';
import BackgroundImage from 'gatsby-background-image';
import { AlignLeft, BookOpen } from 'react-feather';

const PostCard = ({ post }) => {
  const featureImage = getImage(post.localImage) || null;
  const bgFeatureImage = convertToBgImage(featureImage);

  return (
    <Card className="mb-4">
      <Row className="g-0">
        <Col sm={12} md={4} className="mobile-height">
          {featureImage
            ? <BackgroundImage className="img-fluid rounded-start w-100 h-100" {...bgFeatureImage} />
            : (
              <div className="bg-light w-100 h-100 d-flex">
                <AlignLeft size={48} color="grey" className="my-auto mx-auto" />
              </div>
            )}
        </Col>
        <Col sm={12} md={8}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
              {post.excerpt}
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {post.published_at} &bull; {post.reading_time} min
              </small>
            </Card.Text>
            <Link to={`/blog/${post.slug}`} className="btn btn-primary"><BookOpen className="me-1" /> Read</Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default PostCard;
