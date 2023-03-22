/**
 * @param {React.MutableRefObject} ref
 * @param {1 | 2 | 3 | 4 | 5} colorType
 * @param {string} message
 * @example
 * colorType
 * 1: primary
 * 2: success
 * 3: danger
 * 4: warning
 * 5: info
 */
export const notify = (ref, colorType, message) => {
	let type;
	switch (colorType) {
		case 1:
			type = 'primary';
			break;
		case 2:
			type = 'success';
			break;
		case 3:
			type = 'danger';
			break;
		case 4:
			type = 'warning';
			break;
		case 5:
			type = 'info';
			break;
		default:
			break;
	}
	const options = {
		place: 'tr',
		message: (
			<div>
				<span>
					<i className="ni ni-bell-55" /> <b>{message}</b>
				</span>
			</div>
		),
		type,
		icon: '',
		autoDismiss: 7,
	};
	ref.current.notificationAlert(options);
};
