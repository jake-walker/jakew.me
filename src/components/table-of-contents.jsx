import * as React from 'react';
import * as styles from './table-of-contents.module.css';

function renderToc(item) {
  return (
    <React.Fragment key={item.url}>
      <a className={styles.link} href={item.url}>
        {item.title}
      </a>
      {item.items && (
        <ul className="flex-column">
          {item.items.map((i) => renderToc(i))}
        </ul>
      )}
    </React.Fragment>
  );
}

const TableOfContents = ({ toc }) => (
  <nav className={`sticky-top p-3 ${styles.base}`}>
    <p className={styles.title}>Table of Contents</p>
    <ul id="table-of-contents" className={`${styles.baseList} flex-column`}>
      {toc.items.map((item) => renderToc(item))}
    </ul>
  </nav>
);

export default TableOfContents;
