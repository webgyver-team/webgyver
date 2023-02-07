import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Webgyver from '../../../assets/icon/webgyver_white.png';
import { authState, accessToken } from '../../../atom';

const drawerWidth = 240;

export default function MasterNavBar(props) {
  const [auth, setAuth] = useRecoilState(authState);
  const setAccessToken = useSetRecoilState(accessToken);
  const navigate = useNavigate();
  const masterNavItems = ['일정', '내역', '리뷰', '사례', '실시간'];
  const doLogOut = () => {
    setAuth(null);
    setAccessToken('');
    navigate('/');
  };
  const chooseMenu = (item) => {
    // 아래 사이드바 메뉴 클릭 시 실행
    // item의 조건을 추가해 함수 로직 작성
    if (item === '일정') {
      navigate('/master/schedule');
    } else if (item === '내역') {
      navigate('/master/history');
    } else if (item === '리뷰') {
      navigate('/master/review');
    } else if (item === '사례') {
      navigate('/master/example');
    } else if (item === '실시간') {
      navigate('/master/realtime');
    }
  };
  const routeHome = () => navigate('/master/schedule');
  const routeMyPage = () => navigate('/master/mypage');

  // eslint-disable-next-line react/prop-types
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WebGyver
      </Typography>
      <Divider />
      <List>
        {masterNavItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              // 사이드바 메뉴 클릭하면 메뉴 관계없이 chooseMenu 실행하므로
              // 메뉴 추가 시 위의 chooseMenu함수에 item 조건문을 넣어 함수 로직 작성
              onClick={() => chooseMenu(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  // eslint-disable-next-line
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Main>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            {/* 메뉴 버튼 */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* 홈 아이콘 */}
            <Typography
              href=""
              variant="h6"
              component="div"
              sx={{
                display: { xs: 'block', sm: 'none' },
                margin: 'auto',
                paddingRight: '65px',
              }}
            >
              <HomeIcon onClick={routeHome}>
                <img src={Webgyver} alt="이런!" width="30px" />
                <span>WebGyver</span>
              </HomeIcon>
            </Typography>
            <Typography
              href=""
              variant="h6"
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                flexGrow: 1,
              }}
            >
              <MenuBox>
                <HomeIcon onClick={routeHome}>
                  <img src={Webgyver} alt="이런!" width="30px" />
                  <span>WebGyver</span>
                </HomeIcon>
                {masterNavItems.map((item) => (
                  <div key={item} onClick={() => chooseMenu(item)}>
                    <MenuText>{item}</MenuText>
                  </div>
                ))}
              </MenuBox>
            </Typography>
            {auth && (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button color="inherit" onClick={doLogOut}>
                  로그아웃
                </Button>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={routeMyPage}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  .css-hip9hq-MuiPaper-root-MuiAppBar-root {
    // background-color: ${(props) => props.theme.color.defaultaccentColor};
  }
`;

const HomeIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 8px;
  }
`;

const MenuBox = styled.div`
  display: flex;
  div {
    margin-right: 16px;
  }
`;

const MenuText = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
