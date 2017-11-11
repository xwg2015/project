<template>
  <div id="app" class="layout">
    <XHeader />
    <div class="layout-content">
      <Row>
        <Col span="5">
          <XAside />
        </Col>
        <Col span="1">&nbsp;</Col>
        <Col span="17">
          <router-view/>
        </Col>
        <Col span="1">&nbsp;</Col>
      </Row>
    </div>
    <XFooter />
  </div>
</template>

<script>
import XHeader from './components/Header'
import XFooter from './components/Footer'
import XAside from './components/Aside'
export default {
  name: 'app',
  components: {
    XHeader,
    XFooter,
    XAside
  }
}
</script>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-content {
    flex: 1;
    margin: 15px;
    padding-bottom: 20px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
</style>
