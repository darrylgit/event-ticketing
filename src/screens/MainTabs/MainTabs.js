import {Navigation} from 'react-native-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const startTabs = () => {
	Promise.all([
		MaterialCommunityIcons.getImageSource('arrow-left', 28, 'white'), //0
		Octicons.getImageSource('search', 20, '#ac8cbb'), //1, search
		FontAwesome.getImageSource('ticket', 28, '#ac8cbb'), //2, ticket
		Ionicons.getImageSource('ios-settings', 26, '#ac8cbb'), //3, settings
		EvilIcons.getImageSource('user', 34, '#ac8cbb'), //4, user
	]).then(sources => {
		Navigation.setDefaultOptions({
			topBar: {
				visible: true,
				drawBehind: true,
				title: {
					color: 'rgba(255,255,255,.95)',
				},
				background: {
					color: 'transparent',
				},
				backButton: {
					icon: sources[0],
					color: 'white',
				},
			},
			bottomTabs: {
				drawBehind: true,
			},
			animations: {
				push: {
					waitForRender: true,
				},
				showModal: {
					waitForRender: true,
				},
			},
		});
		Navigation.setRoot({
			root: {
				bottomTabs: {
					children: [
						{
							stack: {
								children: [
									{
										component: {
											name: 'project.ExploreScreen',
											options: {
												backgroundImage: require('project/src/assets/bg/hero-image-bg-gradient.png'),
												topBar: {
													visible: false,
													drawBehind: true,
												},
											},
										},
									},
								],
								options: {
									bottomTab: {
										text: 'EXPLORE',
										testID: 'FIRST_TAB_BAR_BUTTON',
										icon: sources[1],
										textColor: '#ac8cbb',
										selectedTextColor: '#e92a4b',
										selectedIconColor: '#e92a4b',
									},
								},
							},
						},
						{
							stack: {
								children: [
									{
										component: {
											name: 'project.TicketScreen',
											options: {
												backgroundImage: require('project/src/assets/bg/hero-image-bg-gradient.png'),
												topBar: {
													visible: true,
													title: {
														text: 'MY TICKETS',
													},
												},
											},
										},
									},
								],
								options: {
									bottomTab: {
										text: 'MY TICKETS',
										testID: 'FOURTH_TAB_BAR_BUTTON',
										icon: sources[2],
										textColor: '#ac8cbb',
										selectedTextColor: '#e92a4b',
										selectedIconColor: '#e92a4b',
									},
								},
							},
						},
						{
							stack: {
								children: [
									{
										component: {
											name: 'project.ProfileScreen',
											passProps: {
												text: 'This is tab 5',
											},
											options: {
												backgroundImage: require('project/src/assets/bg/hero-image-bg-gradient.png'),
												topBar: {
													rightButtons: [
														{
															id: 'SettingsButtonProfileScreenId',
															icon: sources[3],
															color: 'rgba(255,255,255,.8)',
														},
													],
												},
											},
										},
									},
								],
								options: {
									bottomTab: {
										text: 'PROFILE',
										testID: 'FIFTH_TAB_BAR_BUTTON',
										icon: sources[4],
										textColor: '#ac8cbb',
										selectedTextColor: '#e92a4b',
										selectedIconColor: '#e92a4b',
									},
								},
							},
						},
					],
				},
			},
		});
	});
};

export default startTabs;
