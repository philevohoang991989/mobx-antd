import React from 'react';

//antd
import { Row, Image } from 'antd';

import notFoundIcon from 'assets/icons/ic_not-found.svg';
import styles from './not-found.module.scss';

const NotFoundPage = () => {
	return (
		<div className={styles.notFoundGroup}>
			<Row justify='center'>
				<div className={styles.text404}>404</div>
			</Row>
			<Row justify='center'>
				<Image className={styles.icNotFound} preview={false} src={notFoundIcon} />
			</Row>
			<Row justify='center'>
				<div className={styles.textNotFound}>Không tìm thấy trang</div>
			</Row>
			<Row justify='center'>
				<div className={styles.subTextNotFound}>
					Hiện tại không thể tìm thấy trang bạn yêu cầu. Chúng tôi xin lỗi về sự bất tiện
					này, mong bạn vui lòng thử lại sau!
				</div>
			</Row>
		</div>
	);
};

export default NotFoundPage;
