Cria��o da tabela em banco SQL Server, atrav�s do Migration

Definir servidor, base, usuario e senha no arquivo "Config/DbConfig.cs" do projeto "Model".

Executar no Package Manager Console, o comando Update-Database apontando para a configuracao acima.

Ser� aplicado o migration "Initial"

** Se preferir, h� um backup com a tabela na raiz da solution.


No Package mmanager console executar o comando "dotnet restore" e o comando "npm install force".