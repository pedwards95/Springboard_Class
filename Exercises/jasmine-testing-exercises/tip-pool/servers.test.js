describe("Servers test (with setup and tear-down)", function() {
  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a new server on submitServerInfo() with empty input', function ()
  {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  afterEach(function()
  {
    serverNameInput.value = '';
    allServers = {};
    updateServerTable();
  });
});

describe('updateServerTable tests', function()
{
  it('should update server and payment',function()
  {
    submitServerInfo();
    updateServerTable();

    let MyServerTable = document.querySelectorAll('#serverTable tbody tr td');

    expect(MyServerTable.length).toEqual(3);
    expect(MyServerTable[0].innerText).toEqual('Alice');
    expect(MyServerTable[1].innerText).toEqual('$0.00');
  })

  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  afterEach(function()
  {
    serverNameInput.value = '';
    allServers = {};
    updateServerTable();
  });
});
