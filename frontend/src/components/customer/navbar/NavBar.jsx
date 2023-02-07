import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
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
import { authState, accessToken, loginOpenState } from '../../../atom';

const drawerWidth = 240;

export default function NavBar(props) {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const navItems = auth
    ? ['로그아웃', '내 계정', '이용내역']
    : ['로그인', '회원가입'];
  const setLoginOpenState = useSetRecoilState(loginOpenState);
  const setAccessToken = useSetRecoilState(accessToken);
  const openLoginModal = () => setLoginOpenState(true);

  const doLogOut = () => {
    setAuth(null);
    setAccessToken('');
    navigate('/');
  };

  const chooseMenu = (item) => {
    // 아래 사이드바 메뉴 클릭 시 실행
    // item의 조건을 추가해 함수 로직 작성
    if (item === '로그인') {
      openLoginModal();
    } else if (item === '회원가입') {
      navigate('/signup');
    } else if (item === '내 계정') {
      navigate('/mypage');
    } else if (item === '이용내역') {
      navigate('/usagehistory');
    } else if (item === '로그아웃') {
      doLogOut();
    }
  };
  const routeHome = () => navigate('/');
  const routeMypage = () => navigate('/mypage');
  const routeSignup = () => navigate('/signup');
  const handleChange = (event) => {
    if (event.target.checked) {
      setAuth('customer');
    } else {
      setAuth(null);
    }
  };

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
        {navItems.map((item) => (
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
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth === 'customer'}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? 'customer' : false}
          />
        </FormGroup>
        <AppBar position="static" color="primary" sx={{ height: '64px' }}>
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
              <HomeIcon onClick={routeHome}>
                <img src={Webgyver} alt="이런!" width="30px" />
                <span>WebGyver</span>
              </HomeIcon>
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
                  onClick={routeMypage}
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            )}
            {!auth && (
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button color="inherit" onClick={openLoginModal}>
                  로그인
                </Button>
                <Button color="inherit" onClick={routeSignup}>
                  회원가입
                </Button>
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
  min-height: 64px;
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
