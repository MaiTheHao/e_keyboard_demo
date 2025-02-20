import LoadingComp from '@/app/ui/components/loading/LoadingComp';

function RootLoading() {
	return (
		<LoadingComp
			iconStyle={{ animationDuration: '0.75s', animationTimingFunction: 'ease-in-out' }}
			message='Đang chuyển trang'
		/>
	);
}

export default RootLoading;
